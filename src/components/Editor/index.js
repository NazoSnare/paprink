import React, { Component } from 'react'
import styled from 'styled-components'

import PageContent from '../PageContent'
import { today } from '../../api/posts'
import Card from '../Card/'
import CategorySelector from './CategorySelector'

const TitleInputBox = styled.input`
  width: 100%;
  border: none;
  padding: 30px;
  font-size: 28px;
  border-radius: 20px;
  &:focus {
    outline: none;
  }
`

export default class EditorPage extends Component {

  state = {
    title: 'Write an awesome title!',
		categories: null
  }

  onTitleChange = async event => {
    await this.setState({ title: event.target.value })
		this.props.titleState(this.state.title)
  }

  render() {
    return (
      <PageContent noSidebar>

        {/* Post Content */}

				<div className="col-lg-10 offset-lg-1">
					<div className="post_content">

            <TitleInputBox type="text" placeholder="Write an awesome title!" value={this.state.title === '' ? null : this.state.title} onChange={event => this.onTitleChange(event)} />

						<div className="post_body" style={{marginTop: "20px"}}>
							<p className="post_p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce enim nulla, mollis eu metus in, sagittis fringilla tortor. Phasellus eget purus id felis dignissim convallis. Suspendisse et augue dui. Morbi gravida sed justo vel venenatis. Ut tempor pretium maximus. Donec libero diam, faucibus vitae lectus nec, accumsan gravida dui. Nam interdum mi eget lacus aliquet, sit amet ultricies magna pharetra. In ut odio a ligula egestas pretium et quis sapien. Etiam faucibus magna eu porta vulputate. Aliquam euismod rhoncus malesuada. Nunc rutrum hendrerit semper.</p>
							<figure>
								<img src="/static/prebuilt/images/post_image.jpg" alt="" />
								<figcaption>Lorem Ipsum Dolor Sit Amet</figcaption>
							</figure>
							<p className="post_p">Maecenas vitae sem varius, imperdiet nisi a, tristique nisi. Sed scelerisque suscipit leo cursus accumsan. Donec vel turpis quam. Mauris non nisl nec nunc gravida ullamcorper id vestibulum magna. Donec non velit finibus, laoreet arcu nec, facilisis augue. Aliquam sed purus id erat accumsan congue. Mauris semper ullamcorper nibh non pellentesque. Aenean euismod purus sit amet quam vehicula ornare.</p>
							<div className="post_quote">
								<p className="post_p">Aliquam auctor lacus a dapibus pulvinar. Morbi in elit erat. Quisque et augue nec tortor blandit hendrerit eget sit amet sapien. Curabitur at tincidunt metus, quis porta ex. Duis lacinia metus vel eros cursus pretium eget.</p>
								<div className="post_quote_source">Robert Morgan</div>
							</div>
							<p className="post_p">Donec orci dolor, pretium in luctus id, consequat vitae nibh. Quisque hendrerit, lorem sit amet mollis malesuada, urna orci volutpat ex, sed scelerisque nunc velit et massa. Sed maximus id erat vel feugiat. Phasellus bibendum nisi non urna bibendum elementum. Aenean tincidunt nibh vitae ex facilisis ultrices. Integer ornare efficitur ultrices. Integer neque lectus, venenatis at pulvinar quis, aliquet id neque. Mauris ultrices consequat velit, sed dignissim elit posuere in. Cras vitae dictum dui.</p>

							<div className="post_tags" style={{marginTop: '30px'}}>
								<ul>
									<li className="post_tag"><a href="#">Liberty</a></li>
									<li className="post_tag"><a href="#">Manual</a></li>
									<li className="post_tag"><a href="#">Interpretation</a></li>
									<li className="post_tag"><a href="#">Recommendation</a></li>
								</ul>
							</div>
						</div>

						<CategorySelector categoryState={async categories => {
							await this.setState({ categories })
							this.props.categoryState(this.state.categories)
						}} />
						
						<div className="post_panel bottom_panel d-flex flex-row align-items-center justify-content-start">
							Thanks for spending you time here. ❤️ from PaprInk Team!
						</div>

          </div>
        </div>


        {/* End of Post Content */}
        
      </PageContent>
    )
  }

}
