interface InputFormProps {
    title: string;
    value: string;
    type?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputForm = (props: InputFormProps) => {
    const {
        title, value, type = 'text', onChange
    } = props;
    return (
        <div>
            <div>{ title }</div>
            <input aria-label={ `${title}_label` } name={ title } type={ type } value={ value } onChange={ onChange } />
        </div>
    );
};
