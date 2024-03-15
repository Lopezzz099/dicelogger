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