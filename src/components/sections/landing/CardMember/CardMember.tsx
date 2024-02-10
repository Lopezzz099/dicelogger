import style from './CardMember.module.css';

export type CardMemberProps = {
  icon: React.ReactNode;
  title: string;
  text: string;
}

const CardMember = ({ icon, title, text }: CardMemberProps) => {
  return (
    <article className={`${style.card}`}>
      {icon}
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}

export default CardMember;