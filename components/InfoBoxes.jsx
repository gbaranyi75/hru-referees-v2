import InfoBox from './InfoBox';

const InfoBoxes = () => {
  return (
    <section>
      <div className='container-xl lg:container m-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
          <InfoBox
            heading='Játékvezetőink'
            backgroundColor='bg-gray-100'
            buttonInfo={{
              text: 'Ugrás a listára',
              link: '/jatekvezetok',
              backgroundColor: 'bg-black',
            }}
          >
            Jelenleg aktívan dolgozó hazai játékvezetők.
          </InfoBox>
          <InfoBox
            heading='Mérkőzések'
            backgroundColor='bg-blue-100'
            buttonInfo={{
              text: 'Ugrás a listára',
              link: '/merkozesek',
              backgroundColor: 'bg-blue-500',
            }}
          >
            A jelenlegi szezonban lefixált mérkőzések listája.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};
export default InfoBoxes;