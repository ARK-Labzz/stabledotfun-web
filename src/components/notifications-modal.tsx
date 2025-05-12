"use client";

import { useState, useEffect, useRef } from "react";
import { X, Bell, Check, ExternalLink, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

// Notification type definition
type NotificationType = "info" | "success" | "warning" | "transaction";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string; // ISO string
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

export default function NotificationsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");
  const modalRef = useRef<HTMLDivElement>(null);

  // Mock notifications data 
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "transaction",
        title: "Transaction Complete",
        message: "Your purchase of 500 USDCs has been completed successfully.",
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
        read: false,
        actionUrl: "/portfolio/usdc",
        actionLabel: "View Transaction"
      },
      {
        id: "2",
        type: "info",
        title: "New Stablecoin Added",
        message: "CADs has been added to the platform. Check it out now!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        read: false,
        actionUrl: "/portfolio/cad",
        actionLabel: "Explore"
      },
      {
        id: "3",
        type: "success",
        title: "Staking Rewards",
        message: "You've earned 25.5 USDCs from your staking rewards.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
        read: true
      },
      {
        id: "4",
        type: "warning",
        title: "Price Alert",
        message: "EURs price has changed by more than 0.5% in the last hour.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        read: true,
        actionUrl: "/portfolio/eur",
        actionLabel: "Check Rate"
      },
      {
        id: "5",
        type: "transaction",
        title: "Pending Transaction",
        message: "Your withdrawal of 200 USDCs is pending confirmation.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 1.5 days ago
        read: true
      },
      {
        id: "6",
        type: "info",
        title: "Platform Update",
        message: "We've updated our platform with new features and improvements.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
        read: true
      },
      {
        id: "7",
        type: "success",
        title: "Referral Bonus",
        message: "You've received a referral bonus of 10 USDCs.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
        read: true
      },
    ];

    setNotifications(mockNotifications);
  }, []);

  // Close the modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Get unread count for the badge
  const unreadCount = notifications.filter(n => !n.read).length;

  // Filter notifications based on active tab
  const filteredNotifications = activeTab === "all" 
    ? notifications 
    : notifications.filter(n => !n.read);

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Format the timestamp to a human-readable format
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins} min${diffMins === 1 ? '' : 's'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    } else {
      return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    }
  };

  // Get icon based on notification type
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "info":
        return <Info size={16} className="text-primary" />;
      case "success":
        return <Check size={16} className="text-green-500" />;
      case "warning":
        return <AlertTriangle size={16} className="text-yellow-500" />;
      case "transaction":
        return (
          <div className="w-4 h-4 flex items-center justify-center rounded-full bg-white/10">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.0944 8.76196V11.0477C14.0944 12.0382 11.7066 13.3334 8.76107 13.3334C5.81554 13.3334 3.42773 12.0382 3.42773 11.0477V9.14292" stroke="#00c2cb" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3.65137 9.34009C4.31041 10.2148 6.34851 11.0353 8.7607 11.0353C11.7062 11.0353 14.094 9.81171 14.094 8.76028C14.094 8.1698 13.342 7.52294 12.1618 7.06885" stroke="#00c2cb" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11.8092 4.95239V7.23811C11.8092 8.22858 9.42144 9.52382 6.47591 9.52382C3.53039 9.52382 1.14258 8.22858 1.14258 7.23811V4.95239" stroke="#00c2cb" strokeLinecap="round" strokeLinejoin="round" />
              <path fillRule="evenodd" clipRule="evenodd" d="M6.47591 7.22599C9.42144 7.22599 11.8092 6.00237 11.8092 4.95094C11.8092 3.89951 9.42144 2.66675 6.47591 2.66675C3.53039 2.66675 1.14258 3.89875 1.14258 4.95094C1.14258 6.00237 3.53039 7.22599 6.47591 7.22599Z" stroke="#00c2cb" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        );
    }
  };

  // Custom bell SVG for when there are unread notifications
  const CustomBellSvg = () => (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary"
    >
      <path
        d="M16.5962 5.16272C16.5962 6.64388 15.3913 7.84877 13.9101 7.84877C12.429 7.84877 11.2241 6.64388 11.2241 5.16272C11.2241 3.68156 12.429 2.47667 13.9101 2.47667C15.3913 2.47667 16.5962 3.68156 16.5962 5.16272ZM15.0613 9.22249C14.6776 9.32226 14.2939 9.38365 13.9101 9.38365C12.7913 9.38162 11.7189 8.93627 10.9277 8.14513C10.1366 7.35399 9.69123 6.28156 9.6892 5.16272C9.6892 4.03458 10.1343 3.01388 10.8404 2.25412C10.7011 2.08339 10.5255 1.94589 10.3263 1.85163C10.1272 1.75736 9.90953 1.70872 9.6892 1.70923C8.84502 1.70923 8.15432 2.39993 8.15432 3.24412V3.46667C5.87502 4.14202 4.31711 6.23714 4.31711 8.61621V13.2209L2.78223 14.7557V15.5232H16.5962V14.7557L15.0613 13.2209V9.22249ZM9.6892 17.8255C10.5411 17.8255 11.2241 17.1425 11.2241 16.2906H8.15432C8.15432 16.6977 8.31603 17.0881 8.60388 17.376C8.89172 17.6638 9.28213 17.8255 9.6892 17.8255Z"
        fill="#01B8CF"
      />
    </svg>
  );

  return (
    <div className="relative">
      {/* Notification Bell Icon with Badge */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center bg-white/5 hover:bg-secondary/30 border border-primary/30 rounded-full w-10 h-10 cursor-pointer transition-colors"
      >
        {unreadCount > 0 ? (
          <CustomBellSvg />
        ) : (
          <Bell size={18} className="text-primary" />
        )}
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-primary rounded-full text-[10px] text-black font-medium">
            {unreadCount > 9 ? '9+' : unreadCount}
          </div>
        )}
      </button>

      {/* Notifications Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
          <div 
            ref={modalRef}
            className="w-full max-w-md rounded-xl border border-primary/30 bg-sidebar overflow-hidden shadow-xl animate-fadeIn"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white">Notifications</h3>
              <div className="flex items-center gap-3">
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-xs text-primary hover:text-teal transition-colors"
                  >
                    Mark all as read
                  </button>
                )}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white p-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="flex border-b border-white/10">
              <button
                className={cn(
                  "flex-1 py-2 text-sm font-medium transition-colors",
                  activeTab === "all"
                    ? "text-white border-b-2 border-primary"
                    : "text-white/50 hover:text-white"
                )}
                onClick={() => setActiveTab("all")}
              >
                All
              </button>
              <button
                className={cn(
                  "flex-1 py-2 text-sm font-medium transition-colors",
                  activeTab === "unread"
                    ? "text-white border-b-2 border-primary"
                    : "text-white/50 hover:text-white"
                )}
                onClick={() => setActiveTab("unread")}
              >
                Unread {unreadCount > 0 && `(${unreadCount})`}
              </button>
            </div>
            
            {/* Notifications List */}
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-4 border-b border-white/10 hover:bg-white/5 transition-colors",
                      !notification.read && "bg-white/5"
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium text-white truncate">
                            {notification.title}
                          </h4>
                          <span className="text-[10px] text-white/50 whitespace-nowrap ml-2">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                        </div>
                        <p className="text-xs text-white/70 mb-2">
                          {notification.message}
                        </p>
                        {notification.actionUrl && (
                          <a
                            href={notification.actionUrl}
                            className="inline-flex items-center gap-1 text-xs text-primary hover:text-teal transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {notification.actionLabel} 
                            <ExternalLink size={10} />
                          </a>
                        )}
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1"></div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 px-4 text-center text-white/50">
                  <Bell size={32} className="mx-auto mb-3 text-white/30" />
                  <p>{activeTab === "all" ? "No notifications yet" : "No unread notifications"}</p>
                </div>
              )}
            </div>
            
            {/* Modal Footer */}
            <div className="p-3 border-t border-white/10 flex justify-center">
              <button 
                className="text-xs text-white/70 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}