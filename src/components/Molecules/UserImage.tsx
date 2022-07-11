interface UserImageProps {
    url: string;
}

export const UserImage = ({ url }: UserImageProps) => {
    return (
        <img src={ url } alt="new" />
    );
};
