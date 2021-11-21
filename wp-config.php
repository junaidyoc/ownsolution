<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'ownsolutions' );

/** MySQL database username */
define( 'DB_USER', 'ownsolutions' );

/** MySQL database password */
define( 'DB_PASSWORD', '3011' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'KrUXhm hfY_meFAm.?K~FjBe%}NIP8FBt1`&y&bGmpgj?v_[~Zs#W9wE)(i|<fs5' );
define( 'SECURE_AUTH_KEY',  ':hK2h !3!1u<4Hh!@J/tvepX`.qq5mcFKuSSm>adtY(j$sKznO_SX-ZwTty0RA*:' );
define( 'LOGGED_IN_KEY',    'qb*n>-c1l*qs0nZ*Ulz.Vxb!s/2oT,$ zz6r/tvy6B;]q%-rhld@>`YPhH,l`4D0' );
define( 'NONCE_KEY',        '*V>|`UW>6F4^RJJUySz7}7[HsAz]BZ4[u`I Ce1&_-XuQ R4!VY<9~?f3ajon0bt' );
define( 'AUTH_SALT',        '}-^!(f~,`3|Vkifw1w+:OOY/kZOI{_@U2n7NKv&kYp4x97dXJO9EAow?A,|cs!DI' );
define( 'SECURE_AUTH_SALT', 'x$:NwDq|JqG:}f!c/f|B~Cr&$w*lGu^&k}7Xq.laRb?T~w&Zy)]=0@5]/n;R=fI#' );
define( 'LOGGED_IN_SALT',   '92+r`<?{F09{w6<;pD)~9wppL?QY2hc70^67i_@q#^N+pjp*jtq^OzBZf:aFL*9}' );
define( 'NONCE_SALT',       'e)hE)rcS*{OF$@cj>I M2_>N+.(n,>$Zz=rR|)t+X.Uc}kx8a&RL&1Q#Y%)@`$hJ' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
