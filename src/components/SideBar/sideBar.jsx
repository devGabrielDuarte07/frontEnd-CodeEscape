export default function SideBar(){
    const [confirmar, setConfirmar] =
        useState(false)
    const [open, setOpen] =
        useState(false)
    const navigate = useNavigate()

    function sair() {

        localStorage.removeItem('token')

        navigate('/login')
    }
}