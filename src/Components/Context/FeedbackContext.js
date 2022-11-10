import {useState, createContext} from 'react'
import {v4 as uuidv4} from 'uuid'

const FeedbackContext = createContext();
export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1, 
            text: 'This is feedback item 1',
            rating: 1
        },

        {
            id: 2, 
            text: 'This is feedback item 2',
            rating: 7
        },

        {
            id: 3, 
            text: 'This is feedback item 3',
            rating: 6
        },
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    })

    // delete feedback
    const deleteFeedback = id => {
        if(window.confirm('Are you sure you want to delete?')){
            setFeedback( feedback.filter( (item) => item.id !== id))
        }
    }

    // set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit( prevVal => ({
            item :item,
            edit: true 
        }))
    }

    // update feedback
    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map( (item) => item.id === id ? {...item, ...updItem} : item));
    }

    // add feedback
    const addFeedback = (newFeedback) =>  {
        newFeedback.id = uuidv4();
        setFeedback( prev => [newFeedback,...feedback]);    
    }

    return <FeedbackContext.Provider value = {{
            feedback,
            deleteFeedback,
            addFeedback,
            editFeedback,
            feedbackEdit,
            updateFeedback
    }}
    >
    {children}
    </FeedbackContext.Provider>
} 

export default FeedbackContext;                                                                                     