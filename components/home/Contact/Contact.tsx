import styles from "./Contact.module.scss";

export default function Contact() {
  return (
    <section
      id="contact"
      className={styles.contact}
    >
      <div className={styles.left}>

        <span>CONTACT</span>

        <h2>
          Let's Build
          Something
          Meaningful.
        </h2>

      </div>

      <div className={styles.right}>

        <div>

          <h4>Address</h4>

          <p>
            Mashhad
            <br />
            Sajjad Blvd.
            <br />
            Sajjad 22
            <br />
            No.46
          </p>

        </div>

        <div>

          <h4>Phone</h4>

          <a href="tel:+989151156509">
            +98 915 115 6509
          </a>

        </div>

        <div>

          <h4>Email</h4>

          <a href="mailto:info@esmireza5@gmail.com">
            info@esmireza5@gmail.com
          </a>

        </div>

      </div>
    </section>
  );
}