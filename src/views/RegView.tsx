import RegBlock from "../components/blocks/reg/RegBlock"

const RegView: React.FC = () => {

  const authorized = false
  if (authorized) {
      return (
          <>Авторизован</>
      )
  } else {
      return <>
          <RegBlock />
      </>
  }
}
export default RegView

