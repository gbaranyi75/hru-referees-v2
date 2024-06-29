const InfoBox = ({
    heading,
    backgroundColor = 'bg-gray-100',
    textColor = 'text-gray-600',
    buttonInfo,
    children,
  }) => {
    return (
      <div className={`${backgroundColor} p-12 rounded-lg shadow-md`}>
        <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
        <p className={`${textColor} mt-2 mb-7`}>{children}</p>
        <a
          href={buttonInfo.link}
          className={`inline-block ${buttonInfo.backgroundColor} text-white rounded-lg px-4 py-2 hover:opacity-80`}
        >
          {buttonInfo.text}
        </a>
      </div>
    );
  };
  export default InfoBox;