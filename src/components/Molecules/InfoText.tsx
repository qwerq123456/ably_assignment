interface InfoTextProps {
    title: string;
    content: string;
}

export const InfoText = ({ title, content }: InfoTextProps) => {
    return (
        <div>
            <div>{ title }</div>
            <div>{ content }</div>
        </div>
    );
};
