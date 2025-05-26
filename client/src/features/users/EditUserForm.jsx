import React, { useEffect, useState } from 'react'
import { Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import { useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice'

const USER_REGEX = /^[A-Z][a-zA-Z0-9]{2,11}$/;
const PASS_REGEX = /^[a-z0-9]{3,12}$/;

const EditUserForm = ({ user }) => {
    const navigate = useNavigate();
    const id = user.id;

    const [username, setUserName] = useState(user.username);
    const [active, setActive] = useState(user.active);
    const [validUsername, setValidUserName] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [roles, setRoles] = useState(user.roles);

    const [updateUser, { isSuccess, isError, isLoading, error }] = useUpdateUserMutation();
    const [deleteUser, { isSuccess: isDelSuccess, isError: isDelError, isLoading: isDelLoading, error: delError }] = useDeleteUserMutation();

    useEffect(() => {
        setValidUserName(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidPassword(PASS_REGEX.test(password));
    }, [password]);

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            navigate('/dash/users');
        }
    }, [isSuccess, isDelSuccess, navigate]);

    const canSave = password
        ? [validUsername, validPassword, roles.length].every(Boolean) && !isLoading
        : [validUsername, roles.length].every(Boolean) && !isLoading;

    const onClickEdit = async (e) => {
        e.preventDefault();
        if (canSave) {
            const data = password ? { id, username, password, roles, active } : { id, username, roles, active };
            await updateUser(data);
        }
    };

    const onClickDelete = async () => {
        if (window.confirm(`Are you sure you want to delete user "${user.username}"?`)) {
            await deleteUser({ id });
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Edit User</h2>

            <form onSubmit={onClickEdit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        className={`mt-1 w-full p-2 border rounded-md focus:ring-2 ${validUsername ? 'focus:ring-green-500' : 'focus:ring-red-500'}`}
                    />
                    {!validUsername && username && <p className="text-red-500 text-sm">Invalid username</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`mt-1 w-full p-2 border rounded-md focus:ring-2 ${!password || validPassword ? 'focus:ring-green-500' : 'focus:ring-red-500'}`}
                    />
                    {!validPassword && password && <p className="text-red-500 text-sm">Invalid password</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Roles</label>
                    <select
                        multiple
                        value={roles}
                        size={3}
                        onChange={(e) => setRoles(Array.from(e.target.selectedOptions, option => option.value))}
                        className="mt-1 w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Employee">Employee</option>
                        <option value="Manager">Manager</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={active}
                        onChange={() => setActive(!active)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Active</span>
                </div>

                <button
                    type="submit"
                    disabled={!canSave}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Saving...' : 'Save User'}
                </button>
            </form>

            <button
                onClick={onClickDelete}
                disabled={isDelLoading}
                className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Trash size={20} /> {isDelLoading ? 'Deleting...' : 'Delete User'}
            </button>

            {(isError || isDelError) && (
                <p className="text-red-500 text-center mt-2">
                    {error?.data?.message || delError?.data?.message || 'An error occurred.'}
                </p>
            )}
        </div>
    );
};

export default EditUserForm;
