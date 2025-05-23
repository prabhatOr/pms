import { useEffect, useState } from "react";
import CommonLayout from "../layout/CommonLayout";
import axios from "../api/axios";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import { MdDelete } from "react-icons/md";

export default function TaskListPage() {
    const [tasks, setTasks] = useState([]);
    const [page, setPage] = useState(1);
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [projectId, setProjectId] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const { token, user } = useAuth();

    const fetchUsers = async () => {
        try {
            const res = await axios.get('/users', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(res.data);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to fetch users');
        }
    };

    const fetchProjects = async () => {
        try {
            const res = await axios.get('/projects');
            setProjects(res.data.projects || []);
        } catch (err) {
            toast.error('Failed to load projects');
        }
    };

    const fetchTasks = async () => {
        try {
            const res = await axios.get("/tasks", {
                params: { page },
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(res.data.tasks);
        } catch (error) {
            toast.error("Failed to fetch tasks");
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/tasks", { title, description, projectId, assignedTo }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Task created successfully");
            setTitle("");
            setDescription("");
            setProjectId("");
            setAssignedTo("");
            fetchTasks();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to create task");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/tasks/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Task deleted");
            fetchTasks();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete task");
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            await axios.put(`/tasks/${id}`, { status }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Task status updated");
            fetchTasks();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update status");
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchProjects();
    }, [token]);

    useEffect(() => {
        fetchTasks();
    }, [page]);

    const canManageTasks = user?.role === "Admin" || user?.role === "Manager";

    return (
        <CommonLayout>
            <div>
                {canManageTasks && (
                    <>
                        <h2 className="text-lg font-medium mb-4">Add Task</h2>
                        <form onSubmit={handleAddTask} className="space-y-3 mb-6">
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full border p-2 rounded"
                                required
                            />
                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full border p-2 rounded"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <select
                                    value={projectId}
                                    onChange={(e) => setProjectId(e.target.value)}
                                    className="w-full border p-2 rounded"
                                    required
                                >
                                    <option value="">Select Project</option>
                                    {projects.map((project) => (
                                        <option key={project._id} value={project._id}>
                                            {project.name}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={assignedTo}
                                    onChange={(e) => setAssignedTo(e.target.value)}
                                    className="w-full border p-2 rounded"
                                >
                                    <option value="">Assign to User</option>
                                    {users.map((user) => (
                                        <option key={user._id} value={user._id}>
                                            {user.name || user.email}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="w-fit px-4 bg-yellow-100 py-2 rounded hover:bg-gray-200">
                                Add Task
                            </button>
                        </form>
                    </>
                )}

                <div>
                    <h2 className="text-lg font-medium mb-4">All Tasks</h2>
                    {tasks.length === 0 ? (
                        <p className="text-gray-500">No tasks found.</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {tasks.map((task) => (
                                <div
                                    key={task._id}
                                    className="border rounded-lg p-4 hover:bg-yellow-100  h-fit transition"
                                >
                                    <h3 className="font-medium mb-1">{task.title}</h3>
                                    <p className="text-gray-600 text-sm mb-3">{task.description || <em className="text-gray-400">No description</em>}</p>

                                    <div className="flex gap-2 justify-between items-center">
                                        {(user?.role === "Admin" || user?.role === "Manager" || user?.role === "Member") ? (
                                            <div className="flex gap-1">
                                                <label className="block text-sm text-gray-700">
                                                    Status:
                                                </label>
                                                <select
                                                    value={task.status}
                                                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                                                    className="w-fit border border-gray-300 rounded text-xs"
                                                >
                                                    <option value="Pending">To Do</option>
                                                    <option value="In Progress">In Progress</option>
                                                    <option value="Completed">Done</option>
                                            </select>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-700">{task.status}</p>
                                        )}
                                        {canManageTasks && (
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={() => handleDelete(task._id)}
                                                    className="text-red-600 flex items-center gap-1 text-sm hover:underline"
                                                >
                                                   <MdDelete /> Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}

                </div>

                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2">Page {page}</span>
                    <button
                        onClick={() => setPage((p) => p + 1)}
                        className="px-4 py-2 bg-gray-100 rounded"
                    >
                        Next
                    </button>
                </div>
            </div>
        </CommonLayout>
    );
}
