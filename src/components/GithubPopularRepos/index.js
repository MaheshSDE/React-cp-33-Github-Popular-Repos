import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}
// Write your code here
class GithubPopularRepos extends Component {
  state = {
    list: [],
    activeId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getRepositoryItem()
  }

  onChangeFilterItem = id => {
    this.setState({activeId: id}, this.getRepositoryItem)
  }

  getRepositoryItem = async () => {
    const {activeId} = this.state

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeId}`,
    )
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.popular_repos.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
        avatarUrl: eachItem.avatar_url,
      }))
      this.setState({list: updatedData, apiStatus: apiStatusConstants.success})
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderRepositoryItemSuccessView = () => {
    const {list} = this.state
    return (
      <div className="repositoryItemContainer">
        <ul className="repositoryItems">
          {list.map(eachItem => (
            <RepositoryItem itemDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderRepositoryItemFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-name">Something Went Wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  getRenderApiStatusConstants = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoryItemSuccessView()
      case apiStatusConstants.failure:
        return this.renderRepositoryItemFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeId} = this.state
    return (
      <div className="GithubPopularRepos-container">
        <div className="header-container">
          <h1 className="heading">Popular</h1>
          <ul className="languageFilterItem-container">
            {languageFiltersData.map(eachItem => (
              <LanguageFilterItem
                languageDetails={eachItem}
                key={eachItem.id}
                onChangeFilterItem={this.onChangeFilterItem}
                isActive={eachItem.id === activeId}
              />
            ))}
          </ul>
        </div>
        {this.getRenderApiStatusConstants()}
      </div>
    )
  }
}
export default GithubPopularRepos
