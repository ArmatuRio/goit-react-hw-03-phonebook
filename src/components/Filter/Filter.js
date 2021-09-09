import styles from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ onChange, value }) => (
  <label>
    Find contacts by name
    <input className={styles.input} onChange={onChange} value={value} />
  </label>
);

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
export default Filter;
