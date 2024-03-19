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
}

type ButtonLinkCreateProps = {
  children: React.ReactNode;
  link: string;
  storage: string;
}