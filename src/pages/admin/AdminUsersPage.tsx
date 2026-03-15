import { useEffect, useState } from "react"
import { Trash, User } from "lucide-react"
import type { User as UserType } from "../../types"
import Spinner from "../../componentes/Spinner/Spinner"
import ConfirmModal from "../../componentes/ConfirmModal/ConfirmModal"
import Toast from "../../componentes/Toast/Toast"
import { getUsers, deleteUser } from "../../services/adminService"

export default function AdminUsersPage() {

  const [users, setUsers] = useState<UserType[]>([])
  const [loading, setLoading] = useState(true)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchUsers = async () => {
    try {
      const data = await getUsers()
      setUsers(data.users)
    } catch (error) {
      console.error("Error cargando usuarios", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  if (loading) return <Spinner />

  const handleDeleteUser = async () => {
    if (!selectedUser) return

    try {
      setDeleting(true)
      await deleteUser(selectedUser.id)
      setUsers(users.filter(u => u.id !== selectedUser.id))
      setToast({ message: "Usuario eliminado correctamente", type: "success" })
    } catch (error) {
      setToast({ message: "Error al eliminar usuario", type: "error" })
    } finally {
      setDeleting(false)
      setIsModalOpen(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      <h1 className="font-display text-3xl font-semibold text-petDark mb-8">
        Panel de usuarios
      </h1>

      {users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <User size={60} className="text-petIndigoLight" />
          <p className="text-petMuted text-sm">No hay usuarios registrados</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => (
            <div
              key={user.id}
              className="bg-white rounded-2xl shadow-sm border border-petIndigoLight p-5 hover:-translate-y-1 hover:shadow-md transition-all"
            >
              <h2 className="font-display text-lg font-semibold text-petDark mb-2">
                {user.name}
              </h2>
              <p className="text-sm text-petMuted mb-2">{user.email}</p>
              <p className="text-xs text-petIndigo font-medium mb-4">{user.role}</p>

              <button
                onClick={() => {
                  setSelectedUser(user)
                  setIsModalOpen(true)
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold bg-petPink text-white hover:bg-petPinkDark transition-all"
              >
                <Trash size={16} /> Eliminar
              </button>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={isModalOpen}
        title="Eliminar usuario"
        message={`¿Seguro que deseas eliminar a ${selectedUser?.email}?`}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleDeleteUser}
        loading={deleting}
      />

      {toast && (
        <Toast
          message={toast.message} type={toast.type} onClose={() => setToast(null)}
        />
      )}

    </div>
  )
}





