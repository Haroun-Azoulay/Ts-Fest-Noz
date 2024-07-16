export interface JwtPayload {
  userId: string;
  role: string;
}

// ============================================= ArtistProfil Interfaces (Start) =============================================
export interface ArtistProfilAttributes {
  id: string;
  denomination: string; 
  phone_number: string;
  url_media: string;
  picture: string;
  SIRET_number: string;
}
// ============================================= ArtistProfil Interfaces (End) =============================================

// ============================================= City Interfaces (Start) =============================================
export interface CityAttributes {
  id: string;
  user_id: string;
  city_name: string;
  text: string;
  address: string;
  zip_code: number;
  label: string;
  longitude: number;
  latitude: number;
  date: Date;
  style: string;
  color: string;
  departement_number: number;
  region_name: string;
  url_point: string;
}
// ============================================= City Interfaces (End) =============================================

// ============================================= Commentary Interfaces (Start) =============================================
export interface CommentaryAttributes {
  id: string;
  content: string;
  postId: string;
}

export interface Commentaries {
  id: string,
  content: string
}

export interface CommentariesByPost {
  id: string,
  content: string
}
// ============================================= Commentary Interfaces (End) =============================================

// ============================================= Event Interfaces(Start) =============================================
export interface EventAttributes {
  id: string;
  name: string;
  description: string;
  url: string;
  mapId: number; 
}
// ============================================= Event Interfaces(End) =============================================

// ============================================= Map Interfaces(Start) =============================================
export interface MapAttributes {
  id: number;
  // user_id: string; 
  longitude?: number;
  latitude?: number;
  text?: string;
  address: string;
  color: string;
}
// ============================================= Map Interfaces(End) =============================================

// ============================================= OrganizerProfil Interfaces(Start) =============================================
export interface OrganizerProfilAttributes {
  id: string;
  denomination: string;
  phone_number: string;
  full_adress: string;
  SIRET_number: number;
  more_info: string;
}
// ============================================= OrganizerProfil Interfaces(End) =============================================

// ============================================= Payment Interfaces(Start) =============================================
export interface PaymentAttributes {
  id: string;
  token: string;
  payment: boolean;
}
// ============================================= Payment Interfaces(End) =============================================

// ============================================= Post Interfaces(Start) =============================================
export interface PostAttributes {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  userId: string;
}
// ============================================= Post Interfaces(End) =============================================

// ============================================= User Interfaces(Start) =============================================
export interface UserAttributes {
  id?: string;
  lastname: string;
  firstname: string;
  password: string;
  email: string;
  role: string;
  pseudo: string;
}

export interface UserRequest {
  user?: UserAttributes;
}

export interface UserInfo {
  id?: string;
  email: string,
  lastname: string,
  firstname: string,
  role: string,
  pseudo: string
}
// ============================================= User Interfaces(End) =============================================