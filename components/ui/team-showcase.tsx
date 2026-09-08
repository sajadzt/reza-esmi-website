"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./team-showcase.module.scss";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    behance?: string;
  };
}

interface TeamShowcaseProps {
  members: TeamMember[];
}

export default function TeamShowcase({
  members,
}: TeamShowcaseProps) {
  const [activeId, setActiveId] = useState<string | null>(
    members[0]?.id ?? null
  );

  const activeMember =
    members.find((member) => member.id === activeId) ?? members[0];

  return (
    <div className={styles.wrapper}>

      {/* LEFT — IMAGE FIELD */}

      <div className={styles.visualArea}>
        <div className={styles.imageGrid}>

          {members.map((member, index) => {
            const active = member.id === activeId;

            return (
              <button
                key={member.id}
                type="button"
                className={`${styles.imageCard} ${
                  active ? styles.active : ""
                }`}
                onMouseEnter={() => setActiveId(member.id)}
                onFocus={() => setActiveId(member.id)}
                onClick={() => setActiveId(member.id)}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 40vw, 260px"
                  className={styles.image}
                />

                <span className={styles.imageIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            );
          })}

        </div>
      </div>

      {/* RIGHT — TEAM LIST */}

      <div className={styles.memberList}>

        <div className={styles.listHeader}>
          <span>Architecture Team</span>
          <span>{String(members.length).padStart(2, "0")} members</span>
        </div>

        {members.map((member, index) => {
          const active = member.id === activeId;

          return (
            <button
              key={member.id}
              type="button"
              className={`${styles.memberRow} ${
                active ? styles.memberActive : ""
              }`}
              onMouseEnter={() => setActiveId(member.id)}
              onFocus={() => setActiveId(member.id)}
              onClick={() => setActiveId(member.id)}
            >
              <span className={styles.memberNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className={styles.memberInfo}>
                <strong>{member.name}</strong>
                <small>{member.role}</small>
              </span>

              <span className={styles.memberArrow}>
                →
              </span>
            </button>
          );
        })}

        {activeMember && (
          <div className={styles.activeDescription}>
            <span>Currently viewing</span>
            <strong>{activeMember.name}</strong>
            <small>{activeMember.role}</small>
          </div>
        )}

      </div>
    </div>
  );
}