import Head from "next/head"
import { get } from "lodash"
import { FakeHttpApi } from "../src/httpApi"

import "../src/styles/main.scss"

const httpApi = new FakeHttpApi()

class Home extends React.PureComponent {
  state = {
    searchKey: "",
    contacts: [],
  }

  handleSearchKeyChange = evt => {
    const searchKey = get(evt, "currentTarget.value")
    this.searchForContacts(searchKey)
    this.setState({ searchKey })
  }

  searchForContacts = namePart => {
    httpApi.getFirst5MatchingContacts({ namePart }).then(res => {
      this.setState({ contacts: get(res, "data", []) })
    })
  }

  render() {
    const { contacts, searchKey } = this.state

    return (
      <div className="container">
        <Head>
          <title>Raftr Exercise</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1 className="title">Raftr</h1>

          <div className="search">
            <div className="search-container">
              <div className="icon">
                <svg
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                </svg>
              </div>
              <input
                value={searchKey}
                onChange={this.handleSearchKeyChange}
                className="search-input"
                placeholder="Type a name..."
              />
            </div>
          </div>

          <div className="grid">
            {contacts.map(contact => {
              return (
                <a href="https://raftr.com" className="card" key={contact.id}>
                  <h3>{contact.name} &rarr;</h3>
                  <p>☎ {contact.phone}</p>
                  {contact.addressLines.map(addressLine => (
                    <p className="address">{addressLine}</p>
                  ))}
                </a>
              )
            })}
          </div>
        </main>
      </div>
    )
  }
}

export default Home
