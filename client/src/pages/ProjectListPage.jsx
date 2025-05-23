import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import CommonLayout from '../layout/CommonLayout';
import { MdDelete, MdEdit } from 'react-icons/md';

export default function ProjectListPage() {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [editingProjectId, setEditingProjectId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            if (editingProjectId) {
                // Update project
                await axios.put(`/projects/${editingProjectId}`, formData);
                setEditingProjectId(null);
            } else {
                // Create new project
                await axios.post('/projects', formData);
            }

            setFormData({ name: '', description: '' });
            fetchProjects();
        } catch (err) {
            setError(err.response?.data?.message || 'Error saving project');
        } finally {
            setSubmitting(false);
        }
    };

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/projects');
            setProjects(res.data.projects || []);
        } catch (err) {
            setMessage('Failed to load projects');
        } finally {
            setLoading(false);
        }
    };

    const deleteProject = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this project?');
        if (!confirmed) return;
        try {
            await axios.delete(`/projects/${id}`);
            setProjects((prev) => prev.filter((p) => p._id !== id));
        } catch {
            alert('Delete failed');
        }
    };

    const editProject = (project) => {
        setEditingProjectId(project._id);
        setFormData({ name: project.name, description: project.description || '' });
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <CommonLayout>
            <div className="w-full mb-6">
                <h2 className="text-lg font-medium mb-4">{editingProjectId ? 'Edit Project' : 'Create New Project'}</h2>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Project Name"
                        required
                        className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Project Description"
                        rows={4}
                        className="w-full border rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
                    />
                    <div className="flex items-center gap-4">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-4 bg-yellow-100 py-2 rounded hover:bg-gray-200"
                        >
                            {submitting
                                ? editingProjectId
                                    ? 'Updating...'
                                    : 'Creating...'
                                : editingProjectId
                                    ? 'Update Project'
                                    : 'Create Project'}
                        </button>
                        {editingProjectId && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingProjectId(null);
                                    setFormData({ name: '', description: '' });
                                }}
                                className="text-sm text-gray-600 hover:underline"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div>
                <h2 className="text-lg font-medium mb-4">Projects</h2>
                {loading ? (
                    <p className="text-gray-600">Loading projects...</p>
                ) : projects.length === 0 ? (
                    <p className="text-gray-500">No projects found.</p>
                ) : (
                    <div className="flex flex-col gap-4">
                        {projects.map((project) => (
                            <div
                                key={project._id}
                                className="border rounded-lg p-4 hover:bg-yellow-100 transition"
                            >
                                <h3 className="font-medium mb-2">{project.name}</h3>
                                <p className="text-gray-700 mb-4">
                                    {project.description || (
                                        <em className="text-gray-400">No description</em>
                                    )}
                                </p>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => editProject(project)}
                                        className="text-blue-600 flex items-center gap-1 hover:underline text-sm"
                                    >
                                       <MdEdit /> Edit
                                    </button>
                                    <button
                                        onClick={() => deleteProject(project._id)}
                                        className="text-red-600 flex items-center gap-1 hover:underline text-sm"
                                    >
                                       <MdDelete /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {message && <p className="text-red-500 mt-4">{message}</p>}
            </div>

        </CommonLayout>
    );
}
