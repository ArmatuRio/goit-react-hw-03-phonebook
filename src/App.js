import { Component } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  addContact = ({ name, number }) => {
    const newContacts = {
      id: uuidv4(),
      name: name,
      number: number,
    };
    const currentContacts = this.state.contacts.map(contact => contact.name);

    if (currentContacts.includes(newContacts.name)) {
      alert(`${newContacts.name} is alredy in contacts!`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContacts],
      }));
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  filterContactsHandler = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;

    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  render() {
    const filteredContacts = this.getFilteredContacts();
    return (
      <div className="Wrapper">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts:</h2>
        <Filter
          onChange={this.filterContactsHandler}
          value={this.state.filter}
        />
        <ContactList
          contactList={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
