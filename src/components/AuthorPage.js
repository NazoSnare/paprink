import React, { Component } from 'react'

import PageContent from './PageContent'
import Sidebar from './Sidebar'
import { today } from '../api/posts'
import Card from './Card/'

export default class AuthorPage extends Component {
  render() {
    return (
			<>
      <PageContent>

        {/* Page Content */}

				<div className="col-lg-9">
					<div className="main_content">

						<div className="col-md-6" style={{position: "relative", margin: "20px auto", color: "#ffffff"}}>
							<div className="material-card Pink" style={{width: "350px"}}>
								<h2>
										<span><b>{ this.props.authorData.name }</b></span>
										<strong>
												<i className="fa fa-fw fa-star"></i>
												{ this.props.authorData.username }
										</strong>
								</h2>
								<div className="mc-content">
										<div className="img-container">
												<img className="img-responsive" src={this.props.authorData.profilePicture} style={{display: "block", maxWidth: "100%", height: "100%"}} />
										</div>
										<div className="mc-description" style={{color: "black", marginTop: "-10px"}}>
												He has appeared in more than 100 films and television shows, including The Deer Hunter, Annie Hall, The Prophecy trilogy, The Dogs of War ...
										</div>
								</div>
								<a className="mc-btn-action">
										<i className="fa fa-bars"></i>
								</a>
								<div className="mc-footer">
										<h4>
												Social
										</h4>
										<a className="fa fa-fw fa-facebook" style={{borderRadius: "100%"}}></a>
										<a className="fa fa-fw fa-twitter" style={{borderRadius: "100%"}}></a>
										<a className="fa fa-fw fa-linkedin" style={{borderRadius: "100%"}}></a>
										<a className="fa fa-fw fa-google-plus" style={{borderRadius: "100%"}}></a>
								</div>
							</div>
						</div>

						<div className="category">
							<div className="section_panel d-flex flex-row align-items-center justify-content-start">
								<div className="section_title">{ this.props.authorData.name }</div>
							</div>
							<div className="section_content">
								<div className="grid clearfix">
									{ this.props.posts.length > 0 ? this.props.posts.map(post => {
										return <Card type={'small_image'} post={post} key={post.id} />
									}) : <p>No posts available.</p> }
								</div>
							</div>
						</div>

					</div>
					{ this.props.pageInfo.hasNextPage && (
						<div className="load_more">
							<div id="load_more" className="load_more_button text-center trans_200" onClick={this.props.onLoadMore}>Load More</div>
						</div>
					) }
				</div>

        {/* End of Page Content */}

        <Sidebar />

      </PageContent>
			</>
    )
  }
}
