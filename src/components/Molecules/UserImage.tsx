interface UserImageProps {
    url: string;
}

const UserImage = ({ url }: UserImageProps) => {
    return (
        <img src={ url } alt="new" />
    );
};

export default UserImage;
