import { Avatar } from "@mui/material"

type Props = {
    src: string | null
}

const SmallAvatarAtom: React.FC<Props> = ({ src }) => {
    const size = {
        width: 50,
        height: 50
    }
    return <Avatar sx={size} src={src || undefined} />
}

export default SmallAvatarAtom
