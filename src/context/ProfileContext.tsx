"use client";
import {
  createContext, useContext, useState, useEffect,
  useCallback, ReactNode,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  gender: string;
  bio: string;
  address: string;
  city: string;
  country: string;
}

export interface OrderItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  image: string;
}

export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  couponApplied?: string;
  discountAmt?: number;
}

export interface Coupon {
  code: string;
  description: string;
  discount: number;
  type: "percentage" | "flat";
  minOrder: number;
  expiry: string;
  used: boolean;
}

interface ProfileContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  isWishlisted: (id: number) => boolean;
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "date">) => string;
  coupons: Coupon[];
  markCouponUsed: (code: string) => void;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────
const DEFAULT_PROFILE: UserProfile = {
  name: "",
  email: "",
  phone: "",
  gender: "",
  bio: "",
  address: "",
  city: "Dhaka",
  country: "Bangladesh",
};

const DEFAULT_COUPONS: Coupon[] = [
  {
    code: "FASHION10",
    description: "10% off your entire order",
    discount: 10,
    type: "percentage",
    minOrder: 0,
    expiry: "2026-12-31",
    used: false,
  },
  {
    code: "STYLE20",
    description: "20% off orders above ৳2,000",
    discount: 20,
    type: "percentage",
    minOrder: 2000,
    expiry: "2026-09-30",
    used: false,
  },
  {
    code: "WELCOME15",
    description: "15% welcome discount for new shoppers",
    discount: 15,
    type: "percentage",
    minOrder: 0,
    expiry: "2026-12-31",
    used: false,
  },
  {
    code: "NEWUSER30",
    description: "30% off — one-time new user offer",
    discount: 30,
    type: "percentage",
    minOrder: 0,
    expiry: "2026-08-31",
    used: false,
  },
  {
    code: "FREESHIP",
    description: "Free shipping on any order",
    discount: 120,
    type: "flat",
    minOrder: 0,
    expiry: "2026-12-31",
    used: false,
  },
];

const SEED_ORDERS: Order[] = [
  {
    id: "FS-2026-001",
    date: "2026-06-15",
    status: "Delivered",
    items: [
      {
        id: 1,
        name: "Classic Cotton Panjabi",
        category: "Panjabi",
        quantity: 1,
        price: 1490,
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=400&auto=format&fit=crop",
      },
      {
        id: 11,
        name: "Essential White Tee",
        category: "T-Shirts",
        quantity: 2,
        price: 650,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop",
      },
    ],
    total: 2910,
  },
  {
    id: "FS-2026-002",
    date: "2026-05-28",
    status: "Delivered",
    items: [
      {
        id: 7,
        name: "Premium Wool Overcoat",
        category: "Outerwear",
        quantity: 1,
        price: 5500,
        image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=400&auto=format&fit=crop",
      },
    ],
    total: 5500,
    couponApplied: "STYLE20",
    discountAmt: 1100,
  },
  {
    id: "FS-2026-003",
    date: "2026-07-02",
    status: "Shipped",
    items: [
      {
        id: 3,
        name: "Silk Embroidered Panjabi",
        category: "Panjabi",
        quantity: 1,
        price: 2800,
        image: "https://images.unsplash.com/photo-1617952236317-0bd127407984?q=80&w=400&auto=format&fit=crop",
      },
    ],
    total: 2800,
  },
  {
    id: "FS-2026-004",
    date: "2026-07-10",
    status: "Processing",
    items: [
      {
        id: 19,
        name: "Leather Bifold Wallet",
        category: "Accessories",
        quantity: 1,
        price: 1200,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400&auto=format&fit=crop",
      },
      {
        id: 22,
        name: "Slim Oxford Sneakers",
        category: "Footwear",
        quantity: 1,
        price: 2800,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop",
      },
    ],
    total: 4120,
  },
  {
    id: "FS-2026-005",
    date: "2026-04-20",
    status: "Cancelled",
    items: [
      {
        id: 15,
        name: "Slim Fit Chino Trousers",
        category: "Trousers",
        quantity: 2,
        price: 1450,
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=400&auto=format&fit=crop",
      },
    ],
    total: 3020,
  },
];

// ─── Local Storage Helpers ────────────────────────────────────────────────────
function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage quota exceeded or unavailable — silently ignore
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [orders, setOrders] = useState<Order[]>(SEED_ORDERS);
  const [coupons, setCoupons] = useState<Coupon[]>(DEFAULT_COUPONS);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount (client only)
  useEffect(() => {
    setProfile(load("fs_profile", DEFAULT_PROFILE));
    setWishlist(load("fs_wishlist", []));
    setOrders(load("fs_orders", SEED_ORDERS));
    setCoupons(load("fs_coupons", DEFAULT_COUPONS));
    setHydrated(true);
  }, []);

  // Persist on every change (after hydration)
  useEffect(() => { if (hydrated) save("fs_profile", profile); }, [profile, hydrated]);
  useEffect(() => { if (hydrated) save("fs_wishlist", wishlist); }, [wishlist, hydrated]);
  useEffect(() => { if (hydrated) save("fs_orders", orders); }, [orders, hydrated]);
  useEffect(() => { if (hydrated) save("fs_coupons", coupons); }, [coupons, hydrated]);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  }, []);

  const toggleWishlist = useCallback((id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const isWishlisted = useCallback(
    (id: number) => wishlist.includes(id),
    [wishlist]
  );

  const addOrder = useCallback(
    (order: Omit<Order, "id" | "date">): string => {
      const id = `FS-${Date.now()}`;
      const newOrder: Order = {
        ...order,
        id,
        date: new Date().toISOString().split("T")[0],
        status: "Processing",
      };
      setOrders((prev) => [newOrder, ...prev]);
      return id;
    },
    []
  );

  const markCouponUsed = useCallback((code: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, used: true } : c))
    );
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        wishlist,
        toggleWishlist,
        isWishlisted,
        orders,
        addOrder,
        coupons,
        markCouponUsed,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used inside ProfileProvider");
  return ctx;
}
