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
        <div className="bg-white rounded-2xl border border-petIndigoLight shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-petIndigoLight text-petIndigo text-xs font-semibold uppercase tracking-wide">
                <th className="text-left px-5 py-4">Nombre</th>
                <th className="text-left px-5 py-4">Email</th>
                <th className="text-left px-5 py-4">Rol</th>
                <th className="text-left px-5 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-t border-petBorder hover:bg-petCard transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-petIndigoLight/30"
                  }`}
                >
                  <td className="px-5 py-4 font-display font-semibold text-petDark">
                    {user.name}
                  </td>
                  <td className="px-5 py-4 text-petMuted">
                    {user.email}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-block bg-petIndigoLight text-petIndigo text-xs font-medium px-3 py-1 rounded-full capitalize">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => {
                        setSelectedUser(user)
                        setIsModalOpen(true)
                      }}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-petPink text-white hover:bg-petPinkDark transition-all"
                    >
                      <Trash size={16} /> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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





