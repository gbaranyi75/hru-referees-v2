import InfoBox from './InfoBox';

const InfoBoxes = () => {
  return (
    <section>
      <div className='container m-auto max-w-8xl py-5 text-center md:text-left text-gray-600"'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
          <InfoBox
            heading='Játékvezetőink'
            backgroundColor='bg-gray-100'
            buttonInfo={{
              text: 'Ugrás a listára',
              link: '/jatekvezetok',
              backgroundColor: 'bg-gray-800',
            }}
          >
            Jelenleg aktívan dolgozó hazai játékvezetők.
          </InfoBox>
          <InfoBox
            heading='Mérkőzések'
            backgroundColor='bg-blue-200'
            buttonInfo={{
              text: 'Ugrás a listára',
              link: '/merkozesek',
              backgroundColor: 'bg-blue-600',
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