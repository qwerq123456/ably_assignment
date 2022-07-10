interface InfoTextProps {
    title: string;
    content: string;
}

const InfoText = ({ title, content }: InfoTextProps) => {
    return (
        <div>
            <div>{ title }</div>
            <div>{ content }</div>
        </div>
    );
};

export default InfoText;
