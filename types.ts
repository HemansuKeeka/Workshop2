
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio?: string;
  profilePic?: string;
  skills: string[];
  is_subscribed?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}
