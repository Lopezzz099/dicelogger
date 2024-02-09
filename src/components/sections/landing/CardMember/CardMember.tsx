import Image, { StaticImageData } from 'next/image';
import style from './CardMember.module.css';

export type CardMemberProps = {
    icon: StaticImageData;
    title: string;
    text: string;
}

const CardMember = ({icon, title, text}: CardMemberProps) => {

    return (
        <div className={`${style.card}`}>
            <Image src={icon} alt={title} width={91} height={91}/>
            <div>
                <h3>{title}</h3>
                <p>{text}</p>
            </div>
        </div>
    );
}

export default CardMember;