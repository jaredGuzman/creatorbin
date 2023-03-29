import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className="left">
      <Link href="/" legacyBehavior>
        <a className="bold" data-active={isActive("/")}>
          Feed
        </a>
      </Link>
      <style jsx>{`
        .bold {
          font-weight: bold;
        }

        a {
          border: 1px solid darkgray;
          border-radius: 0.25rem;
          text-decoration: none;
          color: #000;
          display: inline-block;
          padding: 0.5rem 1rem;
          transition: box-shadow 0.3s;
        }

        a:hover {
          box-shadow: 2px 4px 5px 0px rgba(0,0,0,0.25);
        }

        .left a[data-active="true"] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );

  let right = null;

  if (status === "loading") {
    left = (
      <div className="left">
        <Link href="/" legacyBehavior>
          <a className="bold" data-active={isActive("/")}>
            Feed
          </a>
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            border: 1px solid darkgray;
            text-decoration: none;
            color: #000;
            display: inline-block;
            padding: 0.5rem 1rem;
            transition: box-shadow 0.3s;
          }

          a:hover {
            box-shadow: 2px 4px 5px 0px rgba(0,0,0,0.25);
          }

          .left a[data-active="true"] {
            color: gray;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right">
        <Link href="/api/auth/signin" legacyBehavior>
          <a data-active={isActive("/signup")}>Log in</a>
        </Link>
        <style jsx>{`
          a {
            text-decoration: none;
            color: #000;
            display: inline-block;
            transition: box-shadow 0.3s;
          }

          a:hover {
            box-shadow: 2px 4px 5px 0px rgba(0,0,0,0.25);
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid darkgray;
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }
        `}</style>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="left">
        <Link href="/" legacyBehavior>
          <a className="bold" data-active={isActive("/")}>
            Feed
          </a>
        </Link>
        <Link href="/project" legacyBehavior>
          <a data-active={isActive("/projects")}>Projects</a>
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            border: 1px solid darkgray;
            border-radius: 0.25rem;
            color: #000;
            display: inline-block;
            padding: 0.5rem 1rem;
            text-decoration: none;
            transition: box-shadow 0.3s;
          }

          a:hover {
            box-shadow: 2px 4px 5px 0px rgba(0,0,0,0.25);
          }

          .left a[data-active="true"] {
            color: black;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>
          {session.user.name} ({session.user.email})
        </p>
        <Link href="/create" legacyBehavior>
          <button>
            <a>New project</a>
          </button>
        </Link>
        <button onClick={() => signOut()}>
          <a>Log out</a>
        </button>
        <style jsx>{`
          a {
            text-decoration: none;
            color: #000;
            display: inline-block;
            transition: box-shadow 0.3s;
          }

          a:hover {
            box-shadow: 2px 4px 5px 0px rgba(0,0,0,0.25);
          }

          p {
            display: inline-block;
            font-size: 13px;
            padding-right: 1rem;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid darkgray;
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }

          button {
            border: none;
          }
        `}</style>
      </div>
    );
  }

  return (
    <nav>
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }
      `}</style>
    </nav>
  );
};

export default Header;
