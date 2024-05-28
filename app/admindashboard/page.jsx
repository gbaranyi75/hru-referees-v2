import SideMenu from '@/components/Sidemenu'
import Content from '@/components/Content'
import DeleteButton from '@/components/common/DeleteButton'

const DashBoard = () => {
  return (
    <div className="container m-auto max-w-7xl py-10 bg-blue-50">
      <div className="flex flex-col md:flex-row mt-2 md:mt-5">
        <div className="basis-1/4">
          <SideMenu />
        </div>
        <div className="basis-3/4">
          <Content />
          {/* <DeleteButton /> */}
        </div>
      </div>
    </div>
  )
}
export default DashBoard
