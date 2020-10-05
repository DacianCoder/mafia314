import { useDispatch, useSelector } from 'react-redux'
import React, { Fragment } from 'react'
import { counterActions } from '../../store/reducers/counterReducer'
import { selectors } from '../../store/selectors'
import DynamicFormattedMessage from '../common/ui/DynamicFormattedMessage'
import Button from '../common/ui/Button'

const Counter: React.FC = () => {
  const count = useSelector(selectors.getCountValue)
  const dispatch = useDispatch()

  return (
    <Fragment>
      <div className="row">
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">Counter component</span>
              <h4>
                Counter: <strong id="counter-value">{count}</strong>
              </h4>
              <p>
                Here you can increment and decrement counter value using buttons
                below. All the state updates are performed via redux toolkit
                actions.
              </p>
            </div>
            <div className="">
              <div className="group">
                <DynamicFormattedMessage
                  tag={Button}
                  id="increment"
                  onClick={() => dispatch(counterActions.increment())}
                />
                <DynamicFormattedMessage
                  tag={Button}
                  values={{ no: 3 }}
                  id="incrementBy"
                  onClick={() => dispatch(counterActions.incrementBy(3))}
                />
                <DynamicFormattedMessage
                  id="decrement"
                  tag={Button}
                  onClick={() => dispatch(counterActions.decrement())}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Counter
