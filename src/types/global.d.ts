type Friend = {
  id: string;
  avatar: string;
  displayname: string;
  username: string;
  following: boolean;
  followsYou: boolean;
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
  disabled?: boolean
}

type ButtonLinkCreateProps = {
  children: React.ReactNode;
  link: string;
  storage: string;
}

type User = {
  id: string;
  email: string;
  username: string;
  displayName: string;
  subExpiration: string;
  subscribed?: boolean;
}