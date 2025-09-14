import React from 'react'
import GoToTop from '../../GoToTop'


function Submission() {
  return (
    <> <GoToTop />
    <div className="container" style={{marginTop: '30vh', marginBottom:'20vh'}}>
    <div class="card" style={{backgroundColor:'white',textAlign: 'center', boxShadow: '0 2px 3px #C8D0D8', padding:'20px'}}>
      <div style={{borderRadius: '200px', height: '200px', width:'200px', background: '#F8FAF5', margin: '0 auto'}}>
        <i style={{color: '#9ABC66', fontSize: '100px',lineHeight: '200px'}} class="checkmark">✓</i>
      </div>
        <h1 style={{ color: '#88B04B',fontWeight: '900',fontSize: '40px',marginBottom: '10px'}}>Success</h1> 
        <p style={{color: '#404F5E',fontSize: '15px'}}>We received your details;<br/> Thank you for your response</p>
      </div>
      </div>
    </>
  )
}

export default Submission
