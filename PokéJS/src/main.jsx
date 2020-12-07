import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Card, CardHeader, CardTitle, CardBody, CardActions, CardImage, CardSubtitle, Avatar } from '@progress/kendo-react-layout';

const cardsData =
    [
        {
            thumbnailSrc: 'https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/bg_flag.jpg',
            headerTitle: 'bg_traditions',
            headerSubtitle: 'Bulgaria, Europe',
            commentsExpanded: false,
            postLiked: false,
            comments: [],
            newCommentTextValue: '',
            postLikes: 174,
            scrollViewItems: { url: 'https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/rose_festival.jpg' }
        },
        {
            thumbnailSrc: 'https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/rila_lakes.jpg',
            headerTitle: 'bg_mountains',
            headerSubtitle: 'Bulgaria, Europe',
            commentsExpanded: false,
            postLiked: false,
            comments: [],
            newCommentTextValue: '',
            postLikes: 962,
            scrollViewItems: { url: 'https://www.telerik.com/kendo-angular-ui-develop/components/layout/card/assets/rila.jpg' }
        }
    ]

class App extends React.Component {

    state = {
        cards: cardsData
    }

    postLikesCount = (card) => {
        let index = this.state.cards.findIndex(item => item.thumbnailSrc === card.thumbnailSrc);
        let newCards = [...this.state.cards];
        newCards[index].postLiked = !newCards[index].postLiked;
        this.setState({ cards: newCards });
    }

    commentClick = (card) => {
        let index = this.state.cards.findIndex(item => item.thumbnailSrc === card.thumbnailSrc);
        let newCards = [...this.state.cards];
        newCards[index].commentsExpanded = !newCards[index].commentsExpanded;
        this.setState({ cards: newCards });
    }

    commentLikesCount = (comment) => {

    }

    postComment = (card) => {
        let index = this.state.cards.findIndex(item => item.thumbnailSrc === card.thumbnailSrc);
        let newCards = [...this.state.cards];
        let textArea = document.querySelector('.k-textarea');
        newCards[index].comments.push({
            likes: 0,
            text: textArea.value
        })
        textArea.value = ''
        this.setState({ cards: newCards });
    }

    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
                {this.state.cards.map(card => {
                    return (
                        <Card style={{ width: 260, boxShadow: '0 0 4px 0 rgba(0, 0, 0, .1)', marginTop: '15px' }}>
                            <CardHeader className="k-hbox" style={{background: 'transparent'}}>
                                <Avatar type='image' shape='circle'><img src={card.thumbnailSrc} style={{ width: 40, height: 40 }} /></Avatar>
                                <div>
                                    <CardTitle style={{marginBottom: '4px'}}>{card.headerTitle}</CardTitle>
                                    <CardSubtitle><p>{card.headerSubtitle}</p></CardSubtitle>
                                </div>
                            </CardHeader>
                            <CardImage src={card.scrollViewItems.url} style={{height: '185px', maxWidth: '100%'}}/>
                            <CardActions style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div>
                                    <button className="k-button k-flat" onClick={() => this.postLikesCount(card)}>
                                        <span className={card.postLiked ? 'k-icon k-i-heart' : 'k-icon k-i-heart-outline'} />
                                    </button>
                                    <button className="k-button k-flat" onClick={() => this.commentClick(card)}>
                                        <span className="k-icon k-i-comment" />
                                    </button>
                                    <button className="k-button k-flat"><span className="k-icon k-i-share"></span></button>
                                </div>
                                <span style={{fontSize: '13px', alignSelf: 'center', color:'#656565'}}>{card.postLikes} likes</span>
                            </CardActions>
                            {
                                card.commentsExpanded &&
                                <CardBody>
                                    <div>
                                        <div style={{marginBottom: '8px', padding: '0 16px'}}>
                                            {
                                                card.comments.map(comment => {
                                                    return (
                                                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                            <div style={{padding: '4px 0', alignItems: 'center', display: 'flex'}}>
                                                                <Avatar
                                                                    type='initials'
                                                                    shape='circle'
                                                                    style={{ color: 'white', width: 20, height: 20 }}
                                                                >
                                                                    <span>SS</span>
                                                                </Avatar>
                                                                <div style={{display:'flex', flexDirection: 'column'}}>
                                                                    <span style={{fontSize: '13px', fontWeight: 'bold', maxWidth: '100px', wordBreak: 'break-all'}}>{comment.text}</span>
                                                                    <span className="time">1s ago<span style={{marginLeft: '8px'}}>{comment.likes} like</span></span>
                                                                </div>
                                                            </div>
                                                            <button className="k-button k-flat" onClick={() => this.commentLikesCount(comment)}>
                                                                <span className={comment && comment.likes > 0 ? 'k-icon k-i-heart' : 'k-icon k-i-heart-outline'} colo />
                                                            </button>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="k-hbox" style={{padding: '16px 16px 0'}}>
                                        <textarea className="k-textarea" placeholder="Comment..." style={{resize: 'none', borderRadius: 10, padding: 5, fontSize: 10}}/>
                                        <button className="k-button k-primary k-flat" style={{ marginLeft: 10, borderRadius: 10 }} onClick={() => this.postComment(card)}>Post</button>
                                    </div>
                                </CardBody>
                            }
                        </Card>
                    )
                })}
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('my-app')
);