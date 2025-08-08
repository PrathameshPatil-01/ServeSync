import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
function FirstCard() {
  return (
   <div className="container my-5">
      <div className="d-flex flex-column gap-4">
        
        {/* Card 1 */}
        <div className="promo-card red-gradient d-flex align-items-center justify-content-between px-4 py-3 rounded-4">
          <div className="d-flex align-items-center">
            <img src="https://i.imgur.com/GlKxS0K.png" alt="Cashews" className="promo-img me-3" />
            <div>
              <h4 className="text-white fw-bold mb-1">Cashews at ₹547/kg</h4>
              <p className="text-white-50 mb-0">use for gravies, tikkas & more</p>
            </div>
          </div>
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-dark rounded-pill px-4">Shop here &gt;</button>
            <div className="circle-btn">›</div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="promo-card blue-gradient d-flex align-items-center justify-content-between px-4 py-3 rounded-4">
          <div className="d-flex align-items-center">
            <img src="https://i.imgur.com/Erk1TiX.png" alt="Coins Bag" className="promo-img me-3" />
            <div>
              <h4 className="text-white fw-bold mb-1">Save ₹1,200 on first 4 orders</h4>
              <p className="text-white-50 mb-0">Get cashback ₹300 on your first 4 orders</p>
            </div>
          </div>
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-dark rounded-pill px-4">Complete signup &gt;</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default FirstCard
