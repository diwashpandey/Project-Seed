// imports from react
import { useContext } from 'react';

// Additional imports
// import { AuthContext } from "../../authentication/AuthProvider" !! Having error in this

function PostRiseButton({alreadyRisen=false, isAuthenticated=false}) {

//   const { isAuthenticated } = useContext(AuthContext) !! Disclaimer !! It's to be fixed
// Error in this: saying useContext is undefined ! WTF 

  if (isAuthenticated){
      // if already Risen: returning Unrise Button
      if(alreadyRisen){
        return (
          <div className="unrise-btn">
                <span>Unrise</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="h-4">
                    <g id="Rise">
                        <path className="cls-1" d="M10,.83A9.17,9.17,0,1,0,19.17,10,9.18,9.18,0,0,0,10,.83Zm3.68,9.06a1.08,1.08,0,0,1-.8.37A1.1,1.1,0,0,1,12.2,10L11.05,9v4.22a1.05,1.05,0,0,1-2.1,0V9L7.8,10a1,1,0,0,1-1.36-1.6L9.32,6a1,1,0,0,1,1.36,0l2.88,2.44A1.06,1.06,0,0,1,13.68,9.89Z"/>
                    </g>
                </svg>
            </div>
        )
      }
      return (
          <div className="rise-btn">
              <span>Rise</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="h-4">
                  <g id="Rise">
                      <path className="cls-1" d="M10,.83A9.17,9.17,0,1,0,19.17,10,9.18,9.18,0,0,0,10,.83Zm3.68,9.06a1.08,1.08,0,0,1-.8.37A1.1,1.1,0,0,1,12.2,10L11.05,9v4.22a1.05,1.05,0,0,1-2.1,0V9L7.8,10a1,1,0,0,1-1.36-1.6L9.32,6a1,1,0,0,1,1.36,0l2.88,2.44A1.06,1.06,0,0,1,13.68,9.89Z"/>
                  </g>
              </svg>
          </div>
      )
  }

  // If not Authenticated returning this button
  return (
      <div className="rise-btn">
          <span>Rise</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="h-4">
              <g id="Rise">
                  <path className="cls-1" d="M10,.83A9.17,9.17,0,1,0,19.17,10,9.18,9.18,0,0,0,10,.83Zm3.68,9.06a1.08,1.08,0,0,1-.8.37A1.1,1.1,0,0,1,12.2,10L11.05,9v4.22a1.05,1.05,0,0,1-2.1,0V9L7.8,10a1,1,0,0,1-1.36-1.6L9.32,6a1,1,0,0,1,1.36,0l2.88,2.44A1.06,1.06,0,0,1,13.68,9.89Z"/>
              </g>
          </svg>
      </div>
  )
}

export default PostRiseButton