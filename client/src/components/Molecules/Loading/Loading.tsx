import { ClipLoader } from 'react-spinners'

const Loading = ({ size = 140, color = '#454545' }) => (
    <ClipLoader
        className='text-brand'
        color={color}
        // loading={loading}
        // cssOverride={override}
        size={size}
    />
)

export default Loading