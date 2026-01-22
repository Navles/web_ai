"use client";

import React, { useState, useEffect } from "react";
import { User, Mail, Shield, Activity, Type } from "lucide-react"; // Import necessary icons
import { User as UserType } from "@/lib/services/userService";
import Dialog from "@/components/common/Dialog";
import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (userData: Omit<UserType, "id">) => Promise<void>;
    userToEdit?: UserType | null;
    isLoading: boolean;
}

export default function UserModal({
    isOpen,
    onClose,
    onSubmit,
    userToEdit,
    isLoading,
}: UserModalProps) {
    const [formData, setFormData] = useState<Omit<UserType, "id">>({
        firstName: "",
        lastName: "",
        email: "",
        role: "User",
        status: "Active",
    });

    useEffect(() => {
        if (userToEdit) {
            setFormData({
                firstName: userToEdit.firstName,
                lastName: userToEdit.lastName,
                email: userToEdit.email,
                role: userToEdit.role,
                status: userToEdit.status,
            });
        } else {
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                role: "User",
                status: "Active",
            });
        }
    }, [userToEdit, isOpen]);

    const handleSubmit = async () => { // Changed to match Dialog footer structure (no event needed)
        await onSubmit(formData);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            title={userToEdit ? "Edit User" : "Add User"}
            maxWidth="md"
            footer={
                <div className="flex items-center justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Saving...
                            </>
                        ) : (
                            userToEdit ? "Update User" : "Add User"
                        )}
                    </button>
                </div>
            }
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">First Name *</label>
                    <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter first name"
                        icon={<Type className="h-4 w-4" />}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Last Name *</label>
                    <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter last name"
                        icon={<Type className="h-4 w-4" />}
                    />
                </div>

                <div className="space-y-1 sm:col-span-2">
                    <label className="text-sm font-medium text-slate-700">Email Address *</label>
                    <Input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john.doe@example.com"
                        type="email"
                        icon={<Mail className="h-4 w-4" />}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Role</label>
                    <Select
                        name="role"
                        value={formData.role}
                        onChange={handleSelectChange}
                        options={[
                            { label: "User", value: "User" },
                            { label: "Admin", value: "Admin" },
                            { label: "Editor", value: "Editor" },
                        ]}
                        icon={<Shield className="h-4 w-4" />}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Status</label>
                    <Select
                        name="status"
                        value={formData.status}
                        onChange={handleSelectChange}
                        options={[
                            { label: "Active", value: "Active" },
                            { label: "Inactive", value: "Inactive" },
                        ]}
                        icon={<Activity className="h-4 w-4" />}
                    />
                </div>
            </div>
        </Dialog>
    );
}
