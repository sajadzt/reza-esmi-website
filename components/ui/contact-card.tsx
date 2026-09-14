import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, PlusIcon } from "lucide-react";

type ContactInfoProps = React.ComponentProps<"div"> & {
  icon: LucideIcon;
  label: string;
  value: string;
};

type ContactCardProps = React.ComponentProps<"div"> & {
  title?: string;
  description?: string;
  contactInfo?: ContactInfoProps[];
  formSectionClassName?: string;
};

export function ContactCard({
  title = "Contact With Us",
  description = "If you have any questions regarding our services or need help, please fill out the form here.",
  contactInfo,
  className,
  formSectionClassName,
  children,
  ...props
}: ContactCardProps) {
  return (
    <div
      className={cn("contact-card", className)}
      {...props}
    >
      <PlusIcon className="contact-card-plus contact-card-plus-top-left" />
      <PlusIcon className="contact-card-plus contact-card-plus-top-right" />
      <PlusIcon className="contact-card-plus contact-card-plus-bottom-left" />
      <PlusIcon className="contact-card-plus contact-card-plus-bottom-right" />

      <div className="contact-card-content">
        <div className="contact-card-introduction">
          <h2>{title}</h2>

          <p>{description}</p>
        </div>

        <div className="contact-card-information">
          {contactInfo?.map((info, index) => (
            <ContactInfo key={index} {...info} />
          ))}
        </div>
      </div>

      <div className={cn("contact-card-form", formSectionClassName)}>
        {children}
      </div>
    </div>
  );
}

function ContactInfo({
  icon: Icon,
  label,
  value,
  className,
  ...props
}: ContactInfoProps) {
  return (
    <div
      className={cn("contact-card-info", className)}
      {...props}
    >
      <div className="contact-card-info-icon">
        <Icon size={18} strokeWidth={1.5} />
      </div>

      <div>
        <p>{label}</p>
        <span>{value}</span>
      </div>
    </div>
  );
}