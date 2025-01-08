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
  userId: string;
}

export interface Commentaries {
  id: string;
  content: string;
}

export interface CommentariesByPost {
  id: string;
  content: string;
}
// ============================================= Commentary Interfaces (End) =============================================

// ============================================= Event Interfaces(Start) =============================================
export interface EventAttributes {
  id: string;
  name: string;
  description: string;
  url: string;
  mapId: number;
  city_id: string;
  user_id: string;
}
// ============================================= Event Interfaces(End) =============================================

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
  userId: string;
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
  email: string;
  lastname: string;
  firstname: string;
  role: string;
  pseudo: string;
}
// ============================================= User Interfaces(End) =============================================

// ============================================= Group Interfaces(Start) =============================================
export interface GroupAttributes {
  id?: string;
  name: string;
}

export interface GroupInfo {
  id?: string;
  name: string;
}
// ============================================= Group Interfaces(End) =============================================

// ============================================= Group Interfaces(Start) =============================================
export interface GroupUserAttributes {
  id?: string;
  groupId?: string;
  userId?: string;
}

export interface GroupUserInfo {
  id?: string;
  groupId?: string;
  userId?: string;
}

export interface GroupUsersDetailInfo {
  id?: string;
  groupId?: string;
  userId?: string;
}
// ============================================= Group Interfaces(End) =============================================

// ============================================= Goodie Interfaces(Start) =============================================
export interface GoodieAttributes {
  id?: string;
  groupId?: string;
  userId?: string;
  goodieTypeId?: string;
  name: string;
  path?: string;
  quantity: number;
  price: number;
  available: boolean;
}

export interface GoodieInfo {
  id?: string;
  groupId?: string;
  userId?: string;
  goodieTypeId?: string;
  type: string;
  name: string;
  path?: string;
  quantity: number;
  price: number;
  available: boolean;
}
// ============================================= Goodie Interfaces(End) =============================================

// ============================================= GoodieType Interfaces(Start) =============================================
export interface GoodieTypeAttributes {
  id?: string;
  name: string;
}

export interface GoodieTypeInfo {
  id?: string;
  name: string;
}
// ============================================= GoodieType Interfaces(End) =============================================

// ============================================= Order Interfaces(Start) =============================================
export interface OrderAttributes {
  id?: string;
  userId?: string;
  totalPrice: number;
  orderdetailId: string;
}

export interface OrderInfo {
  id?: string;
  userId?: string;
  totalPrice: number;
  orderdetailId: string;
}
// ============================================= Order Interfaces(End) =============================================

// ============================================= OrderDetails Interfaces(Start) =============================================
export interface OrderDetailAttributes {
  id?: string;
  orderId?: string;
  userId?: string;
  goodieId?: string;
  quantity: number;
  price: number;
}

export interface OrderDetailInfo {
  id?: string;
  orderId?: string;
  userId?: string;
  goodieId?: string;
  quantity: number;
  price: number;
}
// ============================================= OrderDetails Interfaces(End) =============================================
