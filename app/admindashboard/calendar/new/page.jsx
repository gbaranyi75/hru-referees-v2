import SideMenu from '@/components/Sidemenu'
import CardLayout from '@/components/CardLayout'

const CreateNew = () => {
  return (
    <div className="container m-auto max-w-7xl py-10 bg-blue-50">
      <div className="flex flex-col md:flex-row mt-2 md:mt-5">
        <div className="basis-1/4">
          <SideMenu />
        </div>
        <div className="basis-3/4">
            <CardLayout>aaúj</CardLayout>
        </div>
      </div>
    </div>
  )
}
export default CreateNew