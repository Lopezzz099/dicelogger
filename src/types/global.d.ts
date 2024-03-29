type Friend = {
  id: string;
  avatar: string;
  displayname: string;
  username: string;
  friend: boolean;
}

type Tab = {
  name: string;
  label: string;
  icon?: React.ReactNode;
  component: React.ReactNode;
}

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
<<<<<<< HEAD
  disabled?: boolean;
=======
  disabled?: boolean
>>>>>>> 6f90cbd94e1431dd8754b20727ead8fadfe2aa50
}

type ButtonLinkCreateProps = {
  children: React.ReactNode;
  link: string;
  storage: string;
}