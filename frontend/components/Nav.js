import Link from 'next/link';

const Nav = () => (
	<div className="container">
		<ul className="nav">
			<li className="nav-item"><Link href="/"><a className="nav-link">Home</a></Link></li>
			<li className="nav-item"><Link href="/calendar"><a className="nav-link">Calendar</a></Link></li>
			<li className="nav-item"><Link href="/users"><a className="nav-link">Clients</a></Link></li>
			<li className="nav-item"><Link href="/quotes"><a className="nav-link">Quotes</a></Link></li>
			<li className="nav-item"><Link href="/invoices"><a className="nav-link">Invoices</a></Link></li>
			<li className="nav-item"><Link href="/vessels"><a className="nav-link">Vessels</a></Link></li>
		</ul>
	</div>
)

export default Nav

