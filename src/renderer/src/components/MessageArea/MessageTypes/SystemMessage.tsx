const SystemMessage = ({ content }) => (
    <div className="flex-1 text-center">
      <p className="text-sm italic" style={{ color: 'rgb(153, 153, 153)' }}>
        {content}
      </p>
    </div>
  )

  export default SystemMessage;