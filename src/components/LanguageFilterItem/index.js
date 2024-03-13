// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, onChangeFilterItem, isActive} = props
  const {language, id} = languageDetails

  const activeClassName = isActive ? 'active-class-name' : ' '

  const onClickFilterItem = () => {
    onChangeFilterItem(id)
  }

  return (
    <li className="items">
      <button
        className={`button ${activeClassName}`}
        type="button"
        onClick={onClickFilterItem}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
