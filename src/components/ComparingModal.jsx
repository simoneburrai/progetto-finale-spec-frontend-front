export default function ComparingModal({ products, showModal, onClose }) {
  if (!showModal) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" aria-modal="true" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confronta due articoli</h5>
            <button type="button" className="btn-close" aria-label="Chiudi" onClick={onClose}></button>
          </div>
          <div className="modal-body">
              <div className="row">
                {products.map((p) => (
                  <div className="col" key={p.id}>
                    <h3>{p.title}</h3>
                    <p>{p.category}</p>
                  </div>
                ))}
              </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Chiudi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
