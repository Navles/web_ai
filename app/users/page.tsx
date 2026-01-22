"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { Plus } from "lucide-react";
import UserTable from "@/app/users/UserTable";
import UserModal from "@/app/users/UserModal";
import { userService, User } from "@/lib/services/userService";
import { useToast } from "@/context/ToastContext";

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const { showToast } = useToast();

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const data = await userService.fetchUsers();
            setUsers(data);
        } catch (error) {
            showToast("Failed to fetch users", "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleCreateUser = async (userData: Omit<User, "id">) => {
        setIsSubmitting(true);
        try {
            const newUser = await userService.createUser(userData);
            setUsers((prev) => [...prev, newUser]);
            showToast("User created successfully", "success");
            setIsModalOpen(false);
        } catch (error) {
            showToast("Failed to create user", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdateUser = async (userData: Omit<User, "id">) => {
        if (!editingUser) return;
        setIsSubmitting(true);
        try {
            const updatedUser = await userService.updateUser(editingUser.id, userData);
            setUsers((prev) =>
                prev.map((u) => (u.id === editingUser.id ? updatedUser : u))
            );
            showToast("User updated successfully", "success");
            setIsModalOpen(false);
            setEditingUser(null);
        } catch (error) {
            showToast("Failed to update user", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteUser = async (user: User) => {
        if (!confirm(`Are you sure you want to delete ${user.firstName}?`)) return;

        try {
            await userService.deleteUser(user.id);
            setUsers((prev) => prev.filter((u) => u.id !== user.id));
            showToast("User deleted successfully", "success");
        } catch (error) {
            showToast("Failed to delete user", "error");
        }
    };

    const openCreateModal = () => {
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const openEditModal = (user: User) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <PageHeader
                        title="Users"
                        description="Manage system users and their roles"
                    />
                    <button
                        onClick={openCreateModal}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow-md"
                    >
                        <Plus className="w-4 h-4" />
                        Add User
                    </button>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <UserTable
                        users={users}
                        isLoading={isLoading}
                        onEdit={openEditModal}
                        onDelete={handleDeleteUser}
                    />
                </div>

                <UserModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
                    userToEdit={editingUser}
                    isLoading={isSubmitting}
                />
            </div>
        </DashboardLayout>
    );
}
