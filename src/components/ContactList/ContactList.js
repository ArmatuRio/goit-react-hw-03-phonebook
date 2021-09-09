import PropTypes from 'prop-types';
import styles from './contactList.module.css';

const ContactList = ({ contactList, onDeleteContact }) => {
  return (
    <ol>
      {contactList.map(({ id, name, number }) => (
        <li className={styles.item} key={id}>
          <b>{name}: </b>
          <span>{number}</span>
          <button className={styles.button} onClick={() => onDeleteContact(id)}>
            delete
          </button>
        </li>
      ))}
    </ol>
  );
};

ContactList.propTypes = {
  contactList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onDeleteContact: PropTypes.func.isRequired,
};
export default ContactList;
